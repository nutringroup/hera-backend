import { Optional } from 'sequelize';

export interface ProspectionChecklistSocialAttributes {
  id: number;
  bowlSend: number;
  observation: string;
  paidPartnership: boolean;
  paidPartnershipValue?: number;
  storie: number;
  storieValue: number;
  personalStoriePosted: number;
  photo: number;
  photoValue: number;
  photoFeed: number;
  photoFeedValue: number;
  receivedPhotoDate: string;
  postPhotoFeedDate: string;
  postPhoto?: number;
  video: number;
  videoValue: number;
  videoFeed: number;
  videoFeedValue: number;
  videoDuration: number;
  videoFormat: string;
  videoUploadDate: string;
  receivedVideoDate: string;
  postVideo: number;
  postVideoDate: string;
  canPublishInPublicityDay: boolean;
  observationOtherPublicity?: string;
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
  additionalImageUse: boolean;
  additionalPeriod?: number;
  additionalPeriodValue?: number;
  idProspection: number;

  updatedAt?: Date;
  createdAt?: Date;
}
export interface ProspectionChecklistSocialCreationAttributes extends Optional<ProspectionChecklistSocialAttributes, 'id'> {}