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

export const SITE_NAME = 'COASTAL QUẢNG NGÃI';

export const CONTACT_INFO = {
  hotline: '098 624 3450',
  email: 'info@coastal.com.vn',
  address: '88 Hùng Vương, Trần Phú, Quảng Ngãi',
} as const;

/* Project overview data */
export const PROJECT_INFO = [
  { label: 'Tên dự án', value: 'Coastal Quảng Ngãi' },
  { label: 'Vị trí', value: 'TP. Quảng Ngãi, Tỉnh Quảng Ngãi' },
  { label: 'Chủ đầu tư', value: 'Haus Group' },
  { label: 'Quy mô', value: '93.9 HA' },
  { label: 'Loại hình', value: 'Shophouse, Biệt thự, Căn hộ' },
  { label: 'Pháp lý', value: 'Sổ đỏ lâu dài' },
  { label: 'Bàn giao', value: '2027 - 2028' },
] as const;

/* Introduction highlights */
export const INTRO_HIGHLIGHTS = [
  {
    title: 'Bất động sản nghệ thuật văn hóa',
    description: 'Kiến trúc Địa Trung Hải kết hợp văn hóa bản địa, tạo nên không gian sống đẳng cấp.',
    image: '/images/amenities/art-culture-real-estate.png',
  },
  {
    title: 'Bất động sản du thuyền hạng sang bên vịnh',
    description: 'Bến du thuyền riêng tư, trải nghiệm sống thượng lưu bên bờ biển.',
    image: '/images/amenities/luxury-yacht-real-estate.png',
  },
  {
    title: 'Bất động sản tôn vinh văn hóa truyền thống, bảo tồn thiên nhiên',
    description: 'Hệ sinh thái xanh, bảo tồn cảnh quan thiên nhiên và giá trị văn hóa Quảng Ngãi.',
    image: '/images/amenities/heritage-nature-real-estate.png',
  },
] as const;

/* Product types */
export const PRODUCT_TYPES = [
  { id: 'central-villa', name: 'Central Villa', image: '/images/products/central-villa.jpg' },
  { id: 'nature-villa', name: 'Nature Villa', image: '/images/products/nature-villa.jpg' },
  { id: 'hidden-villa', name: 'Hidden Villa', image: '/images/products/hidden-villa.jpg' },
  { id: 'multikey', name: 'Multikey', image: '/images/products/multikey-smart-design.jpg' },
] as const;

/* Contact form product options */
export const CONTACT_PRODUCT_OPTIONS = [
  'Biệt thự song lập',
  'Biệt thự đơn lập',
  'Nhà phố',
  'Căn hộ',
] as const;

/* Sales policy highlights */
export const SALES_POLICIES = [
  { title: 'Đặt cọc', value: '50 triệu' },
  { title: 'Chiết khấu', value: '10%' },
  { title: 'Hỗ trợ vay', value: '70% ngân hàng' },
  { title: 'Nội thất', value: 'Gói 100 triệu' },
  { title: 'Quà tặng', value: 'Bốc thăm Mercedes' },
] as const;

/* Amenity items for gallery */
export const AMENITIES = [
  { name: 'Nhà hát Opera', image: '/images/amenities/opera-house.jpg' },
  { name: 'Quảng trường âm nhạc', image: '/images/amenities/music-square.jpg' },
  { name: 'Công trình biểu tượng', image: '/images/amenities/iconic-building.jpg' },
  { name: 'Công viên san hô', image: '/images/amenities/coral-park.jpg' },
  { name: 'Bến du thuyền', image: '/images/amenities/yacht-marina.jpg' },
  { name: 'Yacht Clubhouse', image: '/images/amenities/yacht-clubhouse.jpg' },
  { name: 'Trung tâm hội nghị', image: '/images/amenities/conference-center.jpg' },
  { name: 'Boutique House', image: '/images/amenities/boutique-house.jpg' },
  { name: 'Sân chơi trẻ em', image: '/images/amenities/children-playground.jpg' },
  { name: 'Khu vui chơi cho bé', image: '/images/amenities/kids-play-area.jpg' },
  { name: 'Hồ bơi trẻ em', image: '/images/amenities/children-swimming-pool.jpg' },
  { name: 'Hồ cảnh quan', image: '/images/amenities/landscape-lake.jpg' },
  { name: 'Khu thể thao', image: '/images/amenities/sports-area.jpg' },
  { name: 'Sân Pickleball', image: '/images/amenities/pickleball-courts.jpg' },
  { name: 'Hồ bơi trung tâm', image: '/images/amenities/central-swimming-pool.jpg' },
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
