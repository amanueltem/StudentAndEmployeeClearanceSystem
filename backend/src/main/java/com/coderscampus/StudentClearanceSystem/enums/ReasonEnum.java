package com.coderscampus.StudentClearanceSystem.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ReasonEnum {
   WITHDRAWAL("Withdrawal"),
   IDREPLACEMENT("Id Replacement"),
   ENDOFACEDAMICYEAR("End of Acadamic Year"),
   TRANSFER("Transfer");
   private String reasonName;
    ReasonEnum(String reasonName){
    this.reasonName=reasonName;
   }
   public String getReasonName(){
    return reasonName;
   }
}
