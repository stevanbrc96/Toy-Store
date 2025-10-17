export interface Igracka {
  toyId: number;
  name: string;
  permalink: string;
  description: string;
  targetGroup: 'svi' | 'dečak' | 'devojčica';
  productionDate: string;
  price: number;
  imageUrl: string;
  rating?: number; 
  ageGroup: {
    ageGroupId: number;
    name: string;
    description: string;
  };
  type: {
    typeId: number;
    name: string;
    description: string;
  };
}
