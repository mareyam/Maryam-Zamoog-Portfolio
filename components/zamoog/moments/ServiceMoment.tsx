"use client";
import AutomationMoment from "./AutomationMoment";
import ConnectMoment from "./ConnectMoment";
import CustomerMoment from "./CustomerMoment";
import VoiceMoment from "./VoiceMoment";

/** Each service gets its own small interactive moment, all in the same dot-and-line language. */
export default function ServiceMoment({ index }: { index: number }) {
  return [<VoiceMoment key="v" />, <CustomerMoment key="c" />, <AutomationMoment key="a" />, <ConnectMoment key="n" />][index] ?? null;
}
