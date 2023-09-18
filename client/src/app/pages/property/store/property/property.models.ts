import { Property } from '@app/models/server'

export type PropertyCreateRequest = Omit<Property, 'id' | 'createdAt'>;
