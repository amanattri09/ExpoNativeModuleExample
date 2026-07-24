/**
 * Types representing the raw database schema returned by the API.
 * Uses typical backend patterns like snake_case properties and string dates.
 */
export interface RawApiUser {
  user_id: string;
  first_name: string;
  last_name: string;
  email_address: string;
  is_active: boolean;
  avatar_url: string;
  created_at: string; // ISO String
}

/**
 * Normalized types used throughout the frontend components and state store.
 * Uses camelCase properties and javascript Date objects.
 */
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  avatarUrl: string;
  joinedDate: Date;
}

/**
 * UserAdapter transforms schemas between the Raw API shape and Frontend normalized model.
 * Benefit: If the backend renames `email_address` to `user_email`, we only edit this adapter
 * file, rather than searching and renaming keys across all UI components.
 */
export class UserAdapter {
  // Convert Raw API Response -> Frontend User Model
  static toFrontend(raw: RawApiUser): User {
    return {
      id: raw.user_id,
      firstName: raw.first_name,
      lastName: raw.last_name,
      email: raw.email_address,
      isActive: raw.is_active,
      avatarUrl: raw.avatar_url,
      joinedDate: new Date(raw.created_at),
    };
  }

  // Convert Frontend User Model -> Raw API Request Payload
  static toBackend(user: User): RawApiUser {
    return {
      user_id: user.id,
      first_name: user.firstName,
      last_name: user.lastName,
      email_address: user.email,
      is_active: user.isActive,
      avatar_url: user.avatarUrl,
      created_at: user.joinedDate.toISOString(),
    };
  }

  // Convert a list of raw users
  static toFrontendList(rawList: RawApiUser[]): User[] {
    return rawList.map(UserAdapter.toFrontend);
  }
}
