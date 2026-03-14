/* Navigation items matching coastal.com.vn structure */
export const NAV_ITEMS = [
  { label: 'Giới thiệu', href: '#gioi-thieu' },
  { label: 'Tổng quan', href: '#tong-quan' },
  { label: 'Vị trí', href: '#vi-tri' },
  { label: 'Tiện ích', href: '#tien-ich' },
  { label: 'Bàn giao', href: '#ban-giao' },
  { label: 'Chính sách', href: '#chinh-sach' },
  { label: 'Sản phẩm', href: '#san-pham' },
  { label: 'Layout', href: '#layout' },
  { label: 'Tiến độ', href: '#tien-do' },
  { label: 'Tin tức', href: '#tin-tuc' },
  { label: 'Liên hệ', href: '#lien-he' },
] as const;

export const SITE_URL = 'https://hauscoastal.com.vn';
export const SITE_NAME = 'COASTAL QUẢNG NGÃI';

export const CONTACT_INFO = {
  hotline: '098 624 3450',
  hotlineRaw: '0986243450',
  email: 'hauscoastal@gmail.com',
  address: 'Văn phòng tư vấn Dự án Haus Coastal Quảng Ngãi: 88 Hùng Vương, Phường Nghĩa Lộ, Tỉnh Quảng Ngãi',
  zaloUrl: 'https://zalo.me/0986243450',
} as const;

/* Project overview data — chuẩn theo dongtayland.vn */
export const PROJECT_INFO = [
  { label: 'Tên dự án', value: 'Coastal Quảng Ngãi' },
  { label: 'Vị trí', value: 'Đường ven biển Dung Quất – Sa Huỳnh, Quảng Ngãi' },
  { label: 'Chủ đầu tư', value: 'Haus Group' },
  { label: 'Quy mô', value: '93,9 ha' },
  { label: 'Mật độ xây dựng', value: 'Chỉ 14%' },
  { label: 'Loại hình', value: 'Shophouse, Nhà phố, Biệt thự, Căn hộ' },
  { label: 'Số lượng', value: '1.111 căn (146 nhà liền kề, 296 biệt thự, 669 căn hộ)' },
  { label: 'Pháp lý', value: 'Sổ hồng sở hữu lâu dài' },
] as const;

/* Introduction highlights */
export const INTRO_HIGHLIGHTS = [
  {
    title: 'Bất động sản nghệ thuật văn hóa',
    description: 'Kiến trúc Địa Trung Hải kết hợp văn hóa bản địa, tạo nên không gian sống đẳng cấp.',
    image: '/images/amenities/art-culture-real-estate.webp',
  },
  {
    title: 'Bất động sản du thuyền hạng sang bên vịnh',
    description: 'Bến du thuyền riêng tư, trải nghiệm sống thượng lưu bên bờ biển.',
    image: '/images/amenities/luxury-yacht-real-estate.webp',
  },
  {
    title: 'Bất động sản tôn vinh văn hóa truyền thống, bảo tồn thiên nhiên',
    description: 'Hệ sinh thái xanh, bảo tồn cảnh quan thiên nhiên và giá trị văn hóa Quảng Ngãi.',
    image: '/images/amenities/heritage-nature-real-estate.webp',
  },
] as const;

/* Product types — chuẩn theo dongtayland.vn */
export const PRODUCT_TYPES = [
  {
    id: 'shophouse-townhouse',
    name: 'Nhà Liền Kề & Shophouse',
    image: '/images/products/shophouse-townhouse.jpg',
    quantity: '~146 căn',
    maxFloors: 'Cao tối đa 5 tầng',
    description: 'Phù hợp khai thác thương mại, kinh doanh dịch vụ.',
    longDesc: 'Shophouse tại Coastal Quảng Ngãi có tiềm năng tạo dòng tiền khi cộng đồng cư dân hình thành và lượng khách ven biển tăng trưởng.',
  },
  {
    id: 'eco-villa',
    name: 'Biệt Thự Sinh Thái',
    image: '/images/products/eco-villa.jpg',
    quantity: '~296 căn',
    maxFloors: 'Cao tối đa 3 tầng',
    description: 'Không gian riêng tư, mật độ thấp.',
    longDesc: 'Phân khúc dành cho gia chủ mong muốn khẳng định vị thế, tận hưởng môi trường sống xanh và đẳng cấp.',
  },
  {
    id: 'highrise-apartment',
    name: 'Căn Hộ Cao Tầng',
    image: '/images/products/highrise-apartment.jpg',
    quantity: '~669 căn',
    maxFloors: 'Chung cư cao đến 25 tầng',
    description: 'Phù hợp chuyên gia, gia đình trẻ, đầu tư cho thuê.',
    longDesc: 'Căn hộ phù hợp với chuyên gia đang làm việc tại Dung Quất, VSIP... gia đình trẻ hoặc chiến lược đầu tư cho thuê trung – dài hạn.',
  },
] as const;

/* Contact form product options — chuẩn theo dongtayland.vn */
export const CONTACT_PRODUCT_OPTIONS = [
  'Nhà liền kề & Shophouse',
  'Biệt thự sinh thái',
  'Căn hộ cao tầng',
] as const;

/* Sales policy highlights */
export const SALES_POLICIES = [
  { title: 'Đặt cọc', value: '50 triệu' },
  { title: 'Chiết khấu', value: '10%' },
  { title: 'Hỗ trợ vay', value: '70% ngân hàng' },
  { title: 'Nội thất', value: 'Gói 100 triệu' },
  { title: 'Quà tặng', value: 'Bốc thăm Mercedes' },
] as const;

/* Amenity items for gallery — chú thích theo nội dung thực tế ảnh */
export const AMENITIES = [
  { name: 'Kiến trúc nghệ thuật giữa rừng thông', image: '/images/amenities/reference-amenity-1.jpg' },
  { name: 'Clubhouse ven sông', image: '/images/amenities/reference-amenity-2.jpg' },
  { name: 'Hồ bơi cảnh quan', image: '/images/amenities/reference-amenity-3.jpg' },
  { name: 'Công viên & Khu vui chơi trẻ em', image: '/images/amenities/reference-amenity-4.jpg' },
  { name: 'Phố thương mại', image: '/images/amenities/reference-amenity-5.jpg' },
  { name: 'Quảng trường ven biển', image: '/images/amenities/reference-amenity-6.jpg' },
] as const;

/* News/blog items */
export const NEWS_ITEMS = [
  {
    title: 'Vị trí Coastal Quảng Ngãi - Khám phá tiềm năng vàng',
    image: '/images/news/blog-location-golden-potential.jpg',
    slug: 'vi-tri-coastal-quang-ngai',
  },
  {
    title: 'Thiết kế thi công nội thất Haus Quảng Ngãi',
    image: '/images/news/blog-interior-design-construction.jpg',
    slug: 'thiet-ke-noi-that-haus',
  },
  {
    title: 'Cơ hội đầu tư bất động sản tại Quảng Ngãi',
    image: '/images/hero/hero-banner-coastal-aerial.jpg',
    slug: 'co-hoi-dau-tu-bat-dong-san',
  },
] as const;
