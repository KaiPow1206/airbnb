import { Module } from "@nestjs/common";
import { CloudinaryConfig } from "./cloudinary.config";
import { CloudinaryProvider } from "./cloudinary.provider";

@Module({
    providers: [CloudinaryConfig,CloudinaryProvider],
    exports:[CloudinaryProvider]
})
export class CloudinaryModule{}