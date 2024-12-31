export interface ISelectOptionLV {
  value: string;
  label: string;
}

export interface IResultProps<T = unknown> {
  message: string;
  success: boolean;
  data?: T;
}

export interface IFileProps {
  _id: string; //Trace any saved file data on db
  secure_url: string;
  resource_type: string;
  public_id?: string;
  name?: string;
  description?: string; //Optional field to save with file on db
  bytes?: number; //In bytes
  createdAt?: string;
  updatedAt?: string;
}

export interface IFileUpload {
  name: string;
  path: string;
  type?: string;
  preset?: string;
  folder?: string;
  presetType?: TPresetType;
  description?: string;
}
//Cloudinary

export type TPresetType = "authenticated" | "unauthenticated";
export type TPreset = "konjiehifc-preset";