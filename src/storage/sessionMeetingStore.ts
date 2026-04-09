export type SessionMeetingRecord = {
  requestedBy: string;
  title: string;
  meetingTime: string;
  meetLink: string;
  eventId?: string;
  createdAt: string;
};

const MAX_SESSION_MEETINGS = 20;
const meetingRecords: SessionMeetingRecord[] = [];

export const addSessionMeetingRecord = (
  record: Omit<SessionMeetingRecord, "createdAt">
): SessionMeetingRecord => {
  const entry: SessionMeetingRecord = {
    ...record,
    createdAt: new Date().toISOString(),
  };

  meetingRecords.push(entry);

  if (meetingRecords.length > MAX_SESSION_MEETINGS) {
    meetingRecords.splice(0, meetingRecords.length - MAX_SESSION_MEETINGS);
  }

  return entry;
};

export const getLatestMeetingForRequesterSince = (
  requestedBy: string,
  sinceEpochMs: number
): SessionMeetingRecord | null => {
  for (let i = meetingRecords.length - 1; i >= 0; i -= 1) {
    const item = meetingRecords[i];
    if (item.requestedBy !== requestedBy) continue;
    if (new Date(item.createdAt).getTime() < sinceEpochMs) continue;
    return item;
  }
  return null;
};

export const getSessionMeetingRecords = (): SessionMeetingRecord[] => {
  return [...meetingRecords];
};
