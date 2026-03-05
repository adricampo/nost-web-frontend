export interface StrapiImage {
  id: number;
  url: string;
  width: number;
  height: number;
  alternativeText?: string;
}

export interface GalleryImage {
  id: number;
  layout: 'small' | 'medium' | 'large' | 'xl';
  colStart?: number;
  rowStart?: number;
  image?: StrapiImage;
}

export interface GalleryBlock {
  id: number;
  images: GalleryImage[];
  blockText?: string;
  blockTextAlign?: 'left' | 'center' | 'right';
}

export interface Project {
  id: number;
  documentId: string;
  slug: string;
  code: string;
  name: string;
  category: 'RESIDENTIAL' | 'CORPORATE' | 'HOSPITALITY';
  coverImage: StrapiImage;
  galleryBlocks: GalleryBlock[];
  location?: string;
  completedYear?: string;
  size?: string;
  photography?: string;
  press?: string;
  description?: string;
  order?: number;
}

export interface TeamMember {
  id: number;
  name: string;
  bio: string;
  photo?: StrapiImage;
}

export interface Landing {
  heroImages: StrapiImage[];
}

export interface Studio {
  tagline: string;
  descriptionP1: string;
  descriptionP2: string;
  introImage1?: StrapiImage;
  introImage2?: StrapiImage;
  teamMembers: TeamMember[];
  workshopImages: StrapiImage[];
}

export interface ContactInfo {
  tagline: string;
  phone: string;
  email: string;
  instagram?: string;
  linkedin?: string;
  pinterest?: string;
  previewImage?: StrapiImage;
}
