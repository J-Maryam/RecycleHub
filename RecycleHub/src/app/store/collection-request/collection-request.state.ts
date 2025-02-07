import {WasteType} from '../../shared/models/waste-type.enum';

export interface CollectionRequest {
  id: number;
  userId: number;
  wasteType: WasteType;
  estimatedWeight: number;
  collectionAddress: string;
  collectionDate: string;
  status: 'pending' | 'occupied' | 'in-progress' | 'validated' | 'rejected';
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CollectionState {
  requests: CollectionRequest[];
  loading: boolean;
}
