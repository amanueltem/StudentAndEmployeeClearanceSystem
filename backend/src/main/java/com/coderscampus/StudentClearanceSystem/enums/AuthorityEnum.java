package com.coderscampus.StudentClearanceSystem.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum AuthorityEnum {
    ROLE_STUDENT("ROLE_STUDENT","Student"),
    ROLE_EMPLOYEE("ROLE_EMPLOYEE","Employee"),
    ROLE_LIBRARY("ROLE_LIBRARY","Library Circulation"),
    ROLE_REGISTRAR("ROLE_REGISTRAR","Registrar"),
    ROLE_CAFETERIA("ROLE_CAFETERIA","Student Cafeteria"),
    ROLE_DEPARTMENT_HEAD("ROLE_DEPARTMENT_HEAD","Department Head"),
    ROLE_COLLEGE_DEAN("ROLE_COLLEGE_DEAN","College Dean"),
    ROLE_CAMPUS_POLICE("ROLE_CAMPUS_POLICE","Campus Police"),
    ROLE_HR("ROLE_HR","HR"),
    ROLE_ADMIN("ROLE_ADMIN","Admin"),
    ROLE_HR_ADMIN("ROLE_HR_ADMIN","HR Admin"),
    ROLE_PROCTOR("ROLE_PROCTOR","Proctor"),
    ROLE_IMMEDIATE_SUPERVISOR("ROLE_IMMEDIATE_SUPERVISOR","Immediate Supervisor"),
    ROLE_GENERAL_STORE("ROLE_GENERAL_STORE","General Store"),
    ROLE_RESIDENCE("ROLE_RESIDENCE","Residence"),
    ROLE_SPORTS_MASTER("ROLE_SPORTS_MASTER","Sports Master"),
    ROLE_MU_SAVING_AND_CREDIT("ROLE_MU_SAVING_AND_CREDIT","Mu saving and credit"),
    ROLE_FINANCE("ROLE_FINANCE","Finance"),
    ROLE_COMPUTER_CENTER("ROLE_COMPUTER_CENTER","Computer Center");

    private String roleName;
    private String roleValue;
    AuthorityEnum(String roleName,String roleValue){
        this.roleName=roleName;
        this.roleValue=roleValue;
    }
    public String getRoleName(){
        return roleName;
    }
    public String getRoleValue(){
        return roleValue;
    }
}

