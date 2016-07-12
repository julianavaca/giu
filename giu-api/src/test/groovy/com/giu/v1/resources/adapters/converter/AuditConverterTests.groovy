package com.turner.v1.resources.adapters.converter

import com.turner.domain.Audit
import com.turner.domain.Auditable
import spock.lang.Specification

import java.sql.Timestamp

/**
 * Created by mbritez on 31/03/16.
 */
class AuditConverterTests extends Specification {

    private AuditConverter converter
    private DateConverter mockedDateConverter

    def setup(){
        mockedDateConverter = Mock(DateConverter)
        converter = new AuditConverter(mockedDateConverter)
    }

    def "test convert"(){
        setup:
        Timestamp mockedDate = new Timestamp(1,1,1,1,1,1,1)
        def mockedAuditable = Mock(Auditable){
            getfAlta() >> mockedDate
            getUsrNombreAlta() >> "usrNombreAlta"
            getfModi() >> mockedDate
            getUsrNombreModi() >> "usrNombreModi"
        }
        mockedDateConverter.convert(mockedDate) >> "someDate"

        when:
        Audit response = converter.convert(mockedAuditable)

        then:
        response != null
        response.createdBy == "usrNombreAlta"
        response.createdOn == "someDate"
        response.modifiedBy == "usrNombreModi"
        response.modifiedOn == "someDate"
    }
}
