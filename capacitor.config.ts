import { CapacitorConfig } from "@capacitor/cli";
import dotenv from "dotenv";

dotenv.config();

const config: CapacitorConfig = {
  appId: "com.example.app",
  appName: "ahmadilm Profile",
  webDir: "out",
  server: {
    url: process.env.NEXT_PUBLIC_APP_URL,
    cleartext: true,
  },
};

export default config;
