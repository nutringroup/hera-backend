import { Optional } from 'sequelize';

export interface ProspectionChecklistSocialAttributes {
  id: number;
  bowlSend: number;
  observation: string;
  storie: number;
  storieValue: number;
  photo: number;
  photoValue: number;
  photoFeed: number;
  photoFeedValue: number;
  video: number;
  videoValue: number;
  videoFeed: number;
  videoFeedValue: number;
  tiktok: number;
  tiktokValue: number;
  tiktokFeed: number;
  tiktokFeedValue: number;
  igtv: number;
  igtvValue: number;
  igtvFeed: number;
  igtvFeedValue: number;
  live: number;
  liveValue: number;
  liveSave: number;
  liveSaveValue: number;
  youtube: number;
  youtubeValue: number;
  youtubeFeed: number;
  youtubeFeedValue: number;
  brandExclusive: number;
  segmentExclusive: number;
  segmentExclusiveValue: number;
  allowBoost: number;
  commentBoost?: number;
  valueUseImage: number;
  commentChecklist: string;
  idProspection: number;

  updatedAt?: Date;
  createdAt?: Date;
}
export interface ProspectionChecklistSocialCreationAttributes extends Optional<ProspectionChecklistSocialAttributes, 'id'> {}