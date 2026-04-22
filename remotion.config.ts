import { Config } from "@remotion/cli/config";

// Use a dedicated public directory so Remotion does not try to bundle
// hidden workspace folders such as .agents/ that may contain symlinks.
Config.setPublicDir("public");

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
