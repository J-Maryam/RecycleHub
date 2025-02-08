import {WasteType} from './waste-type.enum';

export interface CollectionRequest {
  id: number;
  userId: number;
  wasteTypes: WasteType[];
  estimatedWeight: number;
  collectionAddress: string;
  preferredDate: Date;
  status: 'pending' | 'occupied' | 'in-progress' | 'validated' | 'rejected';
  notes?: string;
  images?: string[];
  createdAt: Date;
  updatedAt: Date;
}
