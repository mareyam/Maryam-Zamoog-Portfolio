export type AppId = "work" | "about" | "services" | "journal" | "contact" | "cv";

export interface AppDef {
  id: AppId;
  label: string;
  /** Shown in the taskbar (the reference docks the first five). */
  docked: boolean;
}

export const APPS: AppDef[] = [
  { id: "work", label: "Work", docked: true },
  { id: "about", label: "About me", docked: true },
  { id: "services", label: "Services", docked: true },
  { id: "journal", label: "Journal", docked: true },
  { id: "contact", label: "Contact", docked: true },
  { id: "cv", label: "CV", docked: false },
];

export const appLabel = (id: AppId) => APPS.find((a) => a.id === id)?.label ?? id;
