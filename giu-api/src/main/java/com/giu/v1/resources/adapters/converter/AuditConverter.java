package com.turner.v1.resources.adapters.converter;

import com.turner.domain.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;

/**
 * Created by biandra on 27/01/16.
 */
@Component
public class AuditConverter {

    private DateConverter dateConverter;

    @Autowired
    public AuditConverter(DateConverter dateConverter){
        this.dateConverter = dateConverter;
    }

    public Audit convert(Auditable auditable){
        return convert(
            auditable.getfAlta(),
            auditable.getUsrNombreAlta(),
            auditable.getfModi(),
            auditable.getUsrNombreModi()
        );
    }

    private Audit convert(
        Timestamp creationDate,
        String creationUsrName,
        Timestamp modificationDate,
        String modificationUsrName){

        Audit audit = new Audit();
        audit.setCreatedOn(dateConverter.convert(creationDate));
        audit.setCreatedBy(creationUsrName);
        audit.setModifiedOn(dateConverter.convert(modificationDate));
        audit.setModifiedBy(modificationUsrName);
        return audit;
    }

}