package com.turner.resources;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by biandra on 25/08/15.
 */
@RestController
@RequestMapping(value = BaseResource.PATH)
@PreAuthorize("hasRole('ROLE_TEST2')")
public class BaseResource {

    public static final String API = "api/";
    public static final String V1 = "v1";
    public static final String PATH = "/";

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public VersionRepresentation get(){
        VersionRepresentation result = new VersionRepresentation();
        result.setVersion(BaseResource.V1);
        return result;
    }
}
