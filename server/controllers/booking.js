const Booking = require("../models/booking");
const User = require("../models/user");
const Pitch = require("../models/pitch");
const asyncHandler = require("express-async-handler");
const booking = require("../models/booking");
const mongoose = require("mongoose");
const https = require('https');
const crypto = require('crypto');
const moment = require('moment'); // npm install moment
const CryptoJS = require('crypto-js'); // npm install crypto-js
const axios = require('axios').default

const createBooking = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { coupon } = req.body;
  const userOrder = await User.findById(_id)
    .select("order")
    .populate("order.pitch", "title price");
  const pitches = userOrder?.order?.map((el) => ({
    pitch: el.pitch._id,
    bookedDate: el.bookedDate,
    shift: el.shift,
  }));
  let total = userOrder?.order?.reduce((sum, el) => el.pitch.price + sum, 0);
  const createData = { pitches, total, bookingBy: _id };
  if (coupon) {
    const selectedCoupon = await Coupon.findById(coupon);
    total =
      Math.round((total * (1 - +selectedCoupon?.discount / 100)) / 1000) *
      1000 || total;
    createData.total = total;
    createData.coupon = coupon;
  }
  const result = await Booking.create(createData);
  return res.status(200).json({
    success: result ? true : false,
    Booking: result ? result : "Cannot create booking",
  });
});

const updateStatusBooking = asyncHandler(async (req, res) => {
  const { _id, status } = req.body;

  // const status = "Success";
  if (!_id) throw new Error("Missing input");
  const response = await Booking.findByIdAndUpdate(
    _id,
    {
      status: status,
    },
    { new: true }
  );
  return res.status(200).json({
    success: response ? true : false,
    Booking: response ? response : "Cannot update status booking",
  });
});

const getUserBooking = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const response = await Booking.find({ bookingBy: userId }).populate(
    "pitch",
    "title price thumb category address"
  );
  return res.status(200).json({
    success: response ? true : false,
    Booking: response ? response : "Cannot get user booking detail",
  });
});

const getUserBookingStatus = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const status = "Pending";
  const response = await Booking.find({ bookingBy: userId, status })
    // .select("pitch")
    .populate("pitch", "title price thumb category address");
  return res.status(200).json({
    success: response ? true : false,
    Booking: response ? response : "Cannot get user booking detail",
  });
});

const deleteBooking = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const response = await Booking.findByIdAndDelete(bid);
  return res.status(200).json({
    success: response ? true : false,
    message: response ? "Deleted" : "Cannot delete booking",
  });
});
const getPitchObjectIdByName = async (pitchName) => {
  const pitch = await Pitch.findOne({ title: pitchName }).select("_id");
  return pitch ? pitch._id : null;
};
const getBookingsOwner = asyncHandler(async (req, res) => {
  const queries = { ...req.query };

  // Tách các trường đặc biệt ra khỏi query
  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((el) => delete queries[el]);

  // Format lại các operators cho đúng cú pháp mongoose
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (matchedEl) => `$${matchedEl}`
  );
  let formattedQueries = JSON.parse(queryString);
  if (req.query.q) {
    // Thêm điều kiện tìm kiếm theo tên sân

    formattedQueries = { status: { $regex: queries.q, $options: "i" } };
  }
  if (req.query.qpitch) {
    formattedQueries = { namePitch: { $regex: queries.qpitch, $options: "i" } };
    delete formattedQueries.qpitch;
  }

  if (queries?.owner) {
    formattedQueries["owner"] = queries?.owner;
  }
  let queryCommand = Booking.find(formattedQueries)
    .populate({
      path: "bookingBy",
      select: "firstname lastname ",
    })
    .populate({
      path: "pitch",
      select: "title thumb owner",
    });
  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  }

  // Fields limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }

  // Pagination
  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_BOOKINGS;
  const skip = (page - 1) * limit;
  queryCommand.skip(skip).limit(limit);

  // Execute query
  queryCommand.exec(async (err, response) => {
    if (err) throw new Error(err.message);

    const counts = await Booking.find(formattedQueries).countDocuments();
    return res.status(200).json({
      success: response ? true : false,
      Bookings: response ? response : "Cannot get pitch",
      totalCount: counts,
    });
  });
});

const getBookings = asyncHandler(async (req, res) => {
  const queries = { ...req.query };

  // Tách các trường đặc biệt ra khỏi query
  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((el) => delete queries[el]);

  // Format lại các operators cho đúng cú pháp mongoose
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (matchedEl) => `$${matchedEl}`
  );
  let formattedQueries = JSON.parse(queryString);
  if (req.query.q) {
    // Thêm điều kiện tìm kiếm theo tên sân

    formattedQueries = { status: { $regex: queries.q, $options: "i" } };
  }
  if (req.query.qpitch) {
    formattedQueries = { namePitch: { $regex: queries.qpitch, $options: "i" } };
    delete formattedQueries.qpitch;
  }

  let queryCommand = Booking.find(formattedQueries)
    .populate({
      path: "bookingBy",
      select: "firstname lastname",
    })
    .populate({
      path: "pitch",
      select: "title thumb",
    });
  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  }

  // Fields limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }

  // Pagination
  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_BOOKINGS;
  const skip = (page - 1) * limit;
  queryCommand.skip(skip).limit(limit);

  // Execute query
  queryCommand.exec(async (err, response) => {
    if (err) throw new Error(err.message);

    const counts = await Booking.find(formattedQueries).countDocuments();
    return res.status(200).json({
      success: response ? true : false,
      Bookings: response ? response : "Cannot get pitch",
      totalCount: counts,
    });
  });
});
const getAllOrderByAdmin = asyncHandler(async (req, res) => {
  const response = await Booking.find();
  return res.json({
    success: response ? true : false,
    allOrder: response ? response : "Can not get data",
  });
});
const updateBookingWithCoupon = async (req, res) => {
  const { bookingId, couponId } = req.body;
  // Find the booking by its ID
  const booking = await Booking.findById(bookingId);

  // Update the coupon field with the provided coupon ID
  booking.coupon = {
    title: couponId.title, // Set the title of the coupon
    price: couponId.price, // Set the price of the coupon
    _id: couponId._id, // Set the ID of the coupon
  };
  // Save the updated booking
  await booking.save();

  return res.json({
    success: booking ? true : false,
  });


};
const Momopayment = async (req, res) => {
  //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
  //parameters
  var accessKey = 'F8BBA842ECF85';
  var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
  var orderInfo = 'pay with MoMo';
  var partnerCode = 'MOMO';
  var redirectUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
  var ipnUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
  var requestType = "payWithMethod";
  var amount = '50000';
  var orderId = partnerCode + new Date().getTime();
  var requestId = orderId;
  var extraData = '';
  var paymentCode = 'T8Qii53fAXyUftPV3m9ysyRhEanUs9KlOPfHgpMR0ON50U10Bh+vZdpJU7VY4z+Z2y77fJHkoDc69scwwzLuW5MzeUKTwPo3ZMaB29imm6YulqnWfTkgzqRaion+EuD7FN9wZ4aXE1+mRt0gHsU193y+yxtRgpmY7SDMU9hCKoQtYyHsfFR5FUAOAKMdw2fzQqpToei3rnaYvZuYaxolprm9+/+WIETnPUDlxCYOiw7vPeaaYQQH0BF0TxyU3zu36ODx980rJvPAgtJzH1gUrlxcSS1HQeQ9ZaVM1eOK/jl8KJm6ijOwErHGbgf/hVymUQG65rHU2MWz9U8QUjvDWA==';
  var orderGroupId = '';
  var autoCapture = true;
  var lang = 'vi';

  //before sign HMAC SHA256 with format
  //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
  var rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
  //puts raw signature
  console.log("--------------------RAW SIGNATURE----------------");
  console.log(rawSignature);

  //signature
  var signature = crypto.createHmac('sha256', secretKey)
    .update(rawSignature)
    .digest('hex');
  console.log("--------------------SIGNATURE----------------");
  console.log(signature);

  //json object send to MoMo endpoint
  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    partnerName: "Test",
    storeId: "MomoTestStore",
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    lang: lang,
    requestType: requestType,
    autoCapture: autoCapture,
    extraData: extraData,
    orderGroupId: orderGroupId,
    signature: signature
  });

  //Create the HTTPS objects
  const options = {
    hostname: 'test-payment.momo.vn',
    port: 443,
    path: '/v2/gateway/api/create',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(requestBody)
    }
  }

  //Send the request and get the response
  const request = https.request(options, (response) => {
    console.log(`Status: ${response.statusCode}`);
    console.log(`Headers: ${JSON.stringify(response.headers)}`);
    response.setEncoding('utf8');
    let body = '';
    response.on('data', (chunk) => {
      body += chunk;
    });
    response.on('end', () => {
      console.log('Body: ');
      console.log(body);
      console.log('resultCode: ');
      console.log(JSON.parse(body).resultCode);
      res.send(body); // Send the response back to the client
    });
  });

  request.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
    res.status(500).send(`problem with request: ${e.message}`);
  });

  // write data to request body
  console.log("Sending....");
  request.write(requestBody);
  request.end();
}

const Zalopayment = async (req, res) => {

  const order2 = req.body;
  const total = order2.reduce((sum, order) => {
    // Check if order.coupon.price is null or undefined
    if (order.coupon && order.coupon.price != null) {
      // Calculate discounted total if coupon price is defined
      const discountedTotal = order.total - (order.total * (order.coupon.price / 100));
      return sum + discountedTotal;
    } else {
      // If order.coupon.price is null or undefined, do not apply discount
      return sum + order.total;
    }
  }, 0);

  const config = {
    app_id: '2553',
    key1: 'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL',
    key2: 'kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz',
    endpoint: 'https://sb-openapi.zalopay.vn/v2/create',
  };
  const embed_data = {
    //sau khi hoàn tất thanh toán sẽ đi vào link này (thường là link web thanh toán thành công của mình)
    redirecturl: 'http://localhost:3000/my-order',
  };

  const items = order2.map(order => ({
    itemid: order._id,
    itemname: order.pitch.title,
    itemprice: order.total,
    itemquantity: 1,
  })); const transID = Math.floor(Math.random() * 1000000);
  const description = order2.map(order => {
    // Check if order.coupon exists and order.coupon.price is not null or undefined
    if (order.coupon && order.coupon.price != null) {
      return `${order.namePitch} - ${order.shift} - ${order.total}, Coupon: ${order.coupon.price}%`;
    } else {
      return `${order.namePitch} - ${order.shift} - ${order.total}`;
    }
  }).join(', ');
  const order = {
    app_id: config.app_id,
    app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
    app_user: 'user123',
    app_time: Date.now(), // miliseconds
    item: JSON.stringify(items),
    embed_data: JSON.stringify(embed_data),
    amount: total,
    //khi thanh toán xong, zalopay server sẽ POST đến url này để thông báo cho server của mình
    //Chú ý: cần dùng ngrok để public url thì Zalopay Server mới call đến được
    callback_url: 'https://b074-1-53-37-194.ngrok-free.app/callback',
    description: description,
    bank_code: '',
  };

  // appid|app_trans_id|appuser|amount|apptime|embeddata|item
  const data =
    config.app_id +
    '|' +
    order.app_trans_id +
    '|' +
    order.app_user +
    '|' +
    order.amount +
    '|' +
    order.app_time +
    '|' +
    order.embed_data +
    '|' +
    order.item;
  order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

  try {
    const result = await axios.post(config.endpoint, null, { params: order });

    return res.status(200).json(result.data);
  } catch (error) {
    console.log(error);
  }
}


module.exports = {
  createBooking,
  updateStatusBooking,
  getUserBooking,
  getBookings,
  deleteBooking,
  getUserBookingStatus,
  getBookingsOwner,
  getAllOrderByAdmin,
  updateBookingWithCoupon,
  Momopayment,
  Zalopayment
};
