import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: "en",
        returnObjects: true,
        resources: {
            en: {
                translation: {
                    navigation: {
                        "nav1": "HOME",
                        "nav2": "PITCHES",
                        "nav3": "FAQs",
                        "nav4": "NEWS",
                        "nav5": "CONTACT",
                    },
                    information: {
                        "infor1": "Profile",
                        "infor2": "Workspace",
                        "infor3": "Sign Out",
                        "infor4": "Pitch Owner Workspace",
                        "infor5": "Sign In or Sign Up",

                    },
                    notification: {
                        "noti1": "Notification",
                        "noti2": "View All",
                        "noti3": "Favorite",
                    },
                    landingbanner: {
                        "landing1": "FOOTBALL & BOOKING",
                        "landing2": "Best Booking Pitches Website",
                        "landing3": "Pitches Collection",
                        "landing4": "Contact us",
                        "landing5": "Refund",
                        "landing6": "Get refund within 3 days",
                        "landing7": "24/7 Support",
                        "landing8": "Get support all day",
                        "landing9": "Special Deal",
                        "landing10": "Deals & Coupon every days",

                    },
                    featurepitch: {
                        "feat1": "Our",
                        "feat2": "Pit",
                        "feat3": "ches"
                    },
                    dealdaily: {
                        "deal1": "Deal",
                        "deal2": "of the month",
                        "deal3": "Check now"
                    },
                    eventbanner: {
                        "event1": "BIG SALE",
                        "event2": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                        "event3": "Up to",
                        "event4": "off",
                        "event5": "Book now",
                    },
                    new1: {
                        "new1": "Our",
                        "new2": "N",
                        "new3": "ews",
                    },
                    filter: {
                        "filter0": "All",
                        "filter1": "Filter by",
                        "filter2": "Price",
                        "filter3": "The highest price is ",
                        "filter4": "Address",
                        "filter5": "selected",
                        "filter6": "Search",
                        "filter7": "Sort by",
                        "filter8": "From",
                        "filter9": "To",
                        "filter10": "Reset",
                        "filter11": "Price, high to low",
                        "filter12": "Price, low to high",
                        "filter13": "Alphabetically, Z-A",
                        "filter14": "Alphabetically, A-Z",
                        "filter15": "Date, new to old",
                        "filter16": "Date, old to new",

                    },
                    pitchcard: {
                        "pitchcard1": "Per Hour",
                        "pitchcard2": "View details"
                    },
                    faq: {
                        "faq1": "WEBSITE INFORMATION",
                        "faq2": "FAQ",
                        "faq3": "Frequently Asked Questions",
                        "faq4": "DON'T SEE YOUR QUESTION HERE? DROP US A LINE",
                        "faq5": "Check out our FAQ or contact us below",
                        "faq6": "Chat with us",
                        "faq7": "Monday-Sunday 9am - 5pm EST",
                    },
                    new: {
                        "new1": "FOOTBALL INFORMATION",
                        "new2": "NEWS ARTICLE",
                        "new3": "FEATURE NEWS",
                        "new4": "Read more",
                        "new5": "News of the day",
                        "new6": "Newest",
                        "new7": "Oldest",
                    },
                    contact: {
                        "contact1": "WEBSITE INFORMATION",
                        "contact2": "Contact Us",
                        "contact3": "Get in touch",
                        "contact4": "Name",
                        "contact5": "Message",
                        "contact6": "Contact us",
                        "contact7": "Address",
                        "contact8": "Phone",
                        "contact9": "Join us on Discord",
                        "contact10": "Example",
                        "contact11": "Your message ...",
                        "contact12": "Send",
                    },
                    detailpitch: {
                        "detail1": "Brand",
                        "detail2": "Description",
                        "detail3": "Address",
                        "detail4": "Shift",
                        "detail5": "Date",
                        "detail6": "Booking",
                        "detail7": "OTHER PITCHES",
                        "detail8": "Select Shift Book",
                        "detail9": "Select Date Book",
                    },
                    pitchExtraInformation: {
                        "pitchEx1": "Guarantee",
                        "pitchEx2": "Quality Checked",
                        "pitchEx3": "Consultancy",
                        "pitchEx4": "Online 24/7",
                        "pitchEx5": "Free Return Money",
                        "pitchEx6": "Within 24 hours",
                        "pitchEx7": "Special Deal",
                        "pitchEx8": "Deals Everyday",
                    },
                    rating: {
                        "rating1": "reviewers",
                        "rating2": "Do you review this pitch?",
                        "rating3": "Rate now",
                        "rating4": "Vote",
                        "rating5": "Comment",
                    },
                    footer: {
                        "foot1": "Company",
                        "foot2": "Phone",
                        "foot3": "Pages",
                        "foot4": "Home",
                        "foot5": "FAQs",
                        "foot6": "Privacy policy",
                        "foot7": "Our Services",
                        "foot8": "Booking Pitches",
                        "foot9": "News",
                        "foot10": "Join with our community",
                        "foot11": "Join and never miss sport news and booking pitches to play",
                        "foot12": "Copyright",
                        "foot13": "company",
                        "foot14": "All Rights Reserve",
                        "foot15": "Designed by:",
                    }
                }
            },
            vi: {
                translation: {
                    navigation: {
                        "nav1": "TRANG CHỦ",
                        "nav2": "SÂN BÓNG",
                        "nav3": "CÂU HỎI",
                        "nav4": "TIN TỨC",
                        "nav5": "LIÊN HỆ",

                    },
                    information: {
                        "infor1": "Thông tin cá nhân",
                        "infor2": "Quản lý cá nhân",
                        "infor3": "Đăng xuất",
                        "infor4": "Quản lý chủ sân",
                        "infor5": "Đăng nhập hoặc đăng kí",

                    },
                    notification: {
                        "noti1": "Thông báo",
                        "noti2": "Tất cả",
                        "noti3": "Yêu thích",
                    },
                    landingbanner: {
                        "landing1": "BÓNG ĐÁ & ĐẶT SÂN",
                        "landing2": "Trang web đặt sân tốt nhất",
                        "landing3": "Danh sách sân bóng",
                        "landing4": "Liên hệ với chúng tôi",
                        "landing5": "Hoàn trả",
                        "landing6": "Nhận hoàn trả dưới 3 ngày",
                        "landing7": "Hỗ trợ 24/7",
                        "landing8": "Nhận hỗ trợ cả ngày",
                        "landing9": "Ưu đãi",
                        "landing10": "Ưu đãi và khuyến mãi mỗi ngày",

                    },
                    featurepitch: {
                        "feat1": "Sân",
                        "feat2": "Bóng ",
                        "feat3": "Nổi Bật"
                    },
                    dealdaily: {
                        "deal1": "Ưu đãi",
                        "deal2": "của tháng",
                        "deal3": "Xem ngay"

                    },
                    eventbanner: {
                        "event1": "GIẢM GIÁ LỚN",
                        "event2": "Giảm giá lớn nhất trong tháng và hàng ngàn mã giảm giá cực sốc.",
                        "event3": "Lên đến",
                        "event4": "giá",
                        "event5": "Đặt sân ngay",
                    },
                    new1: {
                        "new1": "Tin tức",
                        "new2": "mới ",
                        "new3": "nhất",
                    },
                    filter: {
                        "filter0": "Tất cả sân",
                        "filter1": "Sắp xếp theo",
                        "filter2": "Giá",
                        "filter3": "Giá cao nhất là ",
                        "filter4": "Địa chỉ",
                        "filter5": "được chọn",
                        "filter6": "Tìm kiếm",
                        "filter7": "Sắp xếp theo",
                        "filter8": "Từ",
                        "filter9": "Đến",
                        "filter10": "Tạo lại",
                        "filter11": "Giá,từ cao đến thấp",
                        "filter12": "Giá,từ thấp đến cao",
                        "filter13": "Chữ cái, Z-A",
                        "filter14": "Chữ cái, A-Z",
                        "filter15": "Ngày, mới tới cũ",
                        "filter16": "Ngày, cũ tới mới",
                    },
                    pitchcard: {
                        "pitchcard1": "Trên một giờ",
                        "pitchcard2": "Xem chi tiết"
                    },
                    faq: {
                        "faq1": "THÔNG TIN TRANG WEB",
                        "faq2": "HỎI ĐÁP",
                        "faq3": "Các câu hỏi thường gặp",
                        "faq4": "KHÔNG TÌM THẤY CÂU HỎI CỦA BẠN TẠI ĐÂY? GỬI CÂU HỎI CHO CHÚNG TÔI",
                        "faq5": "Hãy xem câu hỏi thường gặp hoặc liên hệ với chúng tôi",
                        "faq6": "Liên hệ với chúng tôi",
                        "faq7": "Thứ 2 - Chủ nhật từ 9h sáng - 5h chiều",
                    },
                    new: {
                        "new1": "THÔNG TIN BÓNG ĐÁ",
                        "new2": "BÀI VIẾT TIN TỨC",
                        "new3": "TIN TỨC NỔI BẬT",
                        "new4": "Đọc thêm",
                        "new5": "Tin tức trong ngày",
                        "new6": "Mới nhất",
                        "new7": "Cũ nhất",
                    },
                    contact: {
                        "contact1": "THÔNG TIN TRANG WEB",
                        "contact2": "LIÊN HỆ",
                        "contact3": "Điền vào đây",
                        "contact4": "Tên",
                        "contact5": "Lời nhắn",
                        "contact6": "Thông tin liên lạc",
                        "contact7": "Địa chỉ",
                        "contact8": "Điện thoại",
                        "contact9": "Tham gia Discord của chúng tôi",
                        "contact10": "Ví dụ",
                        "contact11": "Lời nhắn của bạn ...",
                        "contact12": "Gửi",

                    },
                    detailpitch: {
                        "detail1": "Thương hiệu",
                        "detail2": "Mô tả",
                        "detail3": "Địa chỉ",
                        "detail4": "Thời gian",
                        "detail5": "Ngày",
                        "detail6": "Đặt sân",
                        "detail7": "CÁC SÂN KHÁC",
                        "detail8": "Chọn thời gian đặt",
                        "detail9": "Chọn ngày đặt",
                    },
                    pitchExtraInformation: {
                        "pitchEx1": "Bảo đảm",
                        "pitchEx2": "Đã kiểm tra chất lượng",
                        "pitchEx3": "Tư vấn",
                        "pitchEx4": "Online 24/7",
                        "pitchEx5": "Hoàn tiền miễn phí",
                        "pitchEx6": "Trong vòng 24h",
                        "pitchEx7": "Ưu đãi đặc biệt",
                        "pitchEx8": "Ưu đãi đặc biệt mỗi ngày",
                    },
                    rating: {
                        "rating1": "người đánh giá",
                        "rating2": "Bạn đã đánh giá sân này chưa?",
                        "rating3": "Đánh giá ngay",
                        "rating4": "Số sao",
                        "rating5": "Bình luận",
                    },
                    footer: {
                        "foot1": "Công ty",
                        "foot2": "Điện thoại",
                        "foot3": "Trang",
                        "foot4": "Trang chủ",
                        "foot5": "Hỏi đáp",
                        "foot6": "Chính sách bảo mật",
                        "foot7": "Dịch vụ của chúng tôi",
                        "foot8": "Đặt sân",
                        "foot9": "Tin tức",
                        "foot10": "Tham gia vào cộng đồng của chúng tôi",
                        "foot11": "Tham gia và không bao giờ bỏ lỡ tin tức thể thao và đặt sân để chơi",
                        "foot12": "Bản quyền",
                        "foot13": "công ty",
                        "foot14": "Đã đăng ký Bản quyền",
                        "foot15": "Được thiết kế bởi:",
                    }
                }
            },
        }
    });

export default i18n;