import {
  AudioLines,
  BatteryCharging,
  Cable,
  Camera,
  Cpu,
  Gamepad2,
  HardDrive,
  Headphones,
  House,
  Keyboard,
  Laptop,
  Monitor,
  Mouse,
  Plug,
  Printer,
  Smartphone,
  Speaker,
  Tablet,
  Tv,
  Watch,
  Wifi,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils/cn";
import type { CategoryIcon } from "@/types";

const iconMap: Record<CategoryIcon, LucideIcon> = {
  smartphone: Smartphone,
  laptop: Laptop,
  tablet: Tablet,
  watch: Watch,
  headphones: Headphones,
  earbuds: AudioLines,
  speaker: Speaker,
  monitor: Monitor,
  gamepad: Gamepad2,
  camera: Camera,
  keyboard: Keyboard,
  mouse: Mouse,
  plug: Plug,
  "battery-charging": BatteryCharging,
  cable: Cable,
  "hard-drive": HardDrive,
  cpu: Cpu,
  wifi: Wifi,
  house: House,
  tv: Tv,
  printer: Printer,
};

/** Category glyph resolved from the taxonomy's icon key. */
function CategoryIcon({
  name,
  className,
}: {
  name: CategoryIcon;
  className?: string;
}) {
  const Icon = iconMap[name] ?? Smartphone;
  return <Icon className={cn("size-4", className)} aria-hidden />;
}

export { CategoryIcon };
