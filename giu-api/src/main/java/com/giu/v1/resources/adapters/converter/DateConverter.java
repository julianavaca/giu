package com.turner.v1.resources.adapters.converter;

import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Optional;

/**
 * Created by biandra on 30/12/15.
 */
@Component
public class DateConverter {

    public static final String ISOFORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSS";

    public String convert(java.sql.Date sqlDate){
        return Optional.ofNullable(sqlDate)
                .map(nonNullValue -> new SimpleDateFormat(ISOFORMAT).format(nonNullValue))
                .orElse(null);
    }

    public String convert(java.sql.Timestamp sqlDate){
        return Optional.ofNullable(sqlDate)
                .map(nonNullValue -> new SimpleDateFormat(ISOFORMAT).format(nonNullValue))
                .orElse(null);
    }


    public java.sql.Date convertStringToSqlDate(String sDate){
        return Optional.ofNullable(sDate)
                .map(date ->
                {
                    try {
                        return new java.sql.Date(new SimpleDateFormat(ISOFORMAT).parse(date).getTime());
                    } catch (ParseException e) {
                        return null;
                    }
                }).orElse(null);
    }

}
