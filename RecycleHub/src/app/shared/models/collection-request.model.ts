export interface CollectionRequest {
  id: number;
  userId: number;
  wasteType: string;
  estimatedWeight: number;
  collectionAddress: string;
  collectionDate: string;
  status: 'pending' | 'occupied' | 'in-progress' | 'validated' | 'rejected';
  notes: string;
  createdAt: string;
  updatedAt: string;
}
