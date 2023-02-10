import { Property } from "@app/models/backend"

export type PropertyCreateRequest = Omit<Property, 'id' | 'createdAt'>