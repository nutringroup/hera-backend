import functionNumber from "../../../../../shared/functions/function_number";

class ProspectionFunction {

    calculateMediaSocial(prospection:any){

        var mediaProspectionSocial = 0;

        mediaProspectionSocial = this.calculateItemSocial(Number(prospection.storie), functionNumber.defaultDecimal(prospection.storieValue)) + 
        this.calculateItemSocial(Number(prospection.photo), functionNumber.defaultDecimal(prospection.photoValue)) + 
        this.calculateItemSocial(Number(prospection.photoFeed), functionNumber.defaultDecimal(prospection.photoFeedValue)) + 
        this.calculateItemSocial(Number(prospection.video), functionNumber.defaultDecimal(prospection.videoValue)) + 
        this.calculateItemSocial(Number(prospection.videoFeed), functionNumber.defaultDecimal(prospection.videoFeedValue)) + 
        this.calculateItemSocial(Number(prospection.tiktok), functionNumber.defaultDecimal(prospection.tiktokValue)) + 
        this.calculateItemSocial(Number(prospection.tiktokFeed), functionNumber.defaultDecimal(prospection.tiktokFeedValue)) + 
        this.calculateItemSocial(Number(prospection.igtv), functionNumber.defaultDecimal(prospection.igtvValue)) + 
        this.calculateItemSocial(Number(prospection.igtvFeed), functionNumber.defaultDecimal(prospection.igtvFeedValue)) + 
        this.calculateItemSocial(Number(prospection.live), functionNumber.defaultDecimal(prospection.liveValue)) + 
        this.calculateItemSocial(Number(prospection.liveSave), functionNumber.defaultDecimal(prospection.liveSaveValue)) + 
        this.calculateItemSocial(Number(prospection.youtube), functionNumber.defaultDecimal(prospection.youtubeValue)) + 
        this.calculateItemSocial(Number(prospection.youtubeFeed), functionNumber.defaultDecimal(prospection.youtubeFeedValue)) + 
        this.calculateItemSocial(1, functionNumber.defaultDecimal(prospection.valueUseImageValue)) + 
        this.calculateItemSocial(1, functionNumber.defaultDecimal(prospection.segmentExclusiveValue));

        return {
            storieValue: this.calculateItemSocial(Number(prospection.storie), functionNumber.defaultDecimal(prospection.storieValue)),
            photoValue: this.calculateItemSocial(Number(prospection.photo), functionNumber.defaultDecimal(prospection.photoValue)),
            photoFeedValue: this.calculateItemSocial(Number(prospection.photoFeed), functionNumber.defaultDecimal(prospection.photoFeedValue)),
            videoValue: this.calculateItemSocial(Number(prospection.video), functionNumber.defaultDecimal(prospection.videoValue)),
            videoFeedValue: this.calculateItemSocial(Number(prospection.videoFeed), functionNumber.defaultDecimal(prospection.videoFeedValue)),
            tiktokValue: this.calculateItemSocial(Number(prospection.tiktok), functionNumber.defaultDecimal(prospection.tiktokValue)),
            tiktokFeedValue: this.calculateItemSocial(Number(prospection.tiktokFeed), functionNumber.defaultDecimal(prospection.tiktokFeedValue)),
            igtvValue: this.calculateItemSocial(Number(prospection.igtv), functionNumber.defaultDecimal(prospection.igtvValue)),
            igtvFeedValue: this.calculateItemSocial(Number(prospection.igtvFeed), functionNumber.defaultDecimal(prospection.igtvFeedValue)),
            liveValue: this.calculateItemSocial(Number(prospection.live), functionNumber.defaultDecimal(prospection.liveValue)),
            liveSaveValue: this.calculateItemSocial(Number(prospection.liveSave), functionNumber.defaultDecimal(prospection.liveSaveValue)),
            youtubeValue: this.calculateItemSocial(Number(prospection.youtube), functionNumber.defaultDecimal(prospection.youtubeValue)),
            youtubeFeedValue: this.calculateItemSocial(Number(prospection.youtubeFeed), functionNumber.defaultDecimal(prospection.youtubeFeedValue)),
            segmentExclusiveValue: this.calculateItemSocial(1, functionNumber.defaultDecimal(prospection.segmentExclusiveValue)),
            mediaValue: mediaProspectionSocial
        };
    
    }

    calculateItemSocial(qtd: number, value: number){

        if(qtd > 0 && value > 0){
            return qtd * value;
        }else{
            return 0;
        }

    }

    validateSubtitleUnderage(files: any, index: number){
        if(files.length > 2) {
            if(Number(index) === 0){
                return "rg";
            }else if(Number(index) === 1){
                return "cpf";
            }else{
                return "Comp. nascimento";
            }
        }else if(files.length === 2) {
            if(Number(index) === 0){
                return "rg/cpf";
            }else{
                return "Comp. nascimento";
            } 
        }else{
            return "Comp. nascimento";
        }
    }

    validateSubtitle(index: number){
  
        if(Number(index) === 0){
            return "rg";
        }else if(Number(index) === 1){
            return "cpf";
        }else{
            return "Comp. residência";
        }
        
    }

    validateSubtitleIntervening(index: number){
  
        if(Number(index) === 0){
            return "Inscrição CNPJ";
        }else if(Number(index) === 1){
            return "Inscrição do Estado";
        }else if(Number(index) === 2){
            return "Contrato Social";
        }else{
            return "Documento Extra";
        }
        
    }

}

export default new ProspectionFunction();