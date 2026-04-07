export interface SoftGoodInterface {
  _id: string;
  brandId?: string;
  attributeSetId?: string;
  category?: string;
  color?: string;
  description?: string;
  gallery_images_url?: string[] | null;
  gender?: string;
  gst?: number;
  mrp?: number;
  primary_image_url?: string | null;
  season?: string | null;
  series?: string | null;
  size?: string;
  sku?: string;
  sleeves?: string | null;
  stock_88?: number;
  stock_90?: number;
  style_id?: string;
  type?: string | null;
  variation_sku?: string[];
}
