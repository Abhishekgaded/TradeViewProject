// import os from "os";
// import { execSync } from "child_process";
// import crypto from "crypto";

// function getSerial() {
//   switch (os.platform()) {
//     case "win32":
//       return execSync("wmic baseboard get serialnumber").toString();
//     case "linux":
//       return execSync("sudo dmidecode -s baseboard-serial-number").toString();
//     case "darwin":
//       return execSync("ioreg -l | grep IOPlatformSerialNumber").toString();
//     default:
//       return "";
//   }
// }

// function getHardwareFingerprint() {
//   const raw = getSerial();
//   // return crypto.createHash("sha256").update(raw).digest("hex");
//   return raw;
// }

// console.log(getHardwareFingerprint());


import si from "systeminformation";

async function getHardwareInfo() {
  const cpu = await si.cpu();
  const mem = await si.mem();
  const disk = await si.diskLayout();
  const baseboard = await si.baseboard();
  const bios = await si.bios();
  const gpu = await si.graphics();
  const osInfo = await si.osInfo();
  const network = await si.networkInterfaces();
  const battery = await si.battery();
  const chassis = await si.chassis();

  return {
    cpu,
    mem,
    disk,
    baseboard,
    bios,
    gpu,
    osInfo,
    network,
    battery,
    chassis
  };
}

getHardwareInfo().then(console.log).catch(console.error);
