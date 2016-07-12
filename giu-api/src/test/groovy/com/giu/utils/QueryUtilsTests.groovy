package com.turner.utils

import spock.lang.Specification

/**
 * Created by mbritez on 4/01/16.
 */
class QueryUtilsTests extends Specification {

    QueryUtils utils

    def setup(){
        utils = new QueryUtils()
    }

    def "test add parameter"(){
        setup:
        String someKey = "thisIsSomeKey"
        String someValue = "thisIsSomeValue"

        when:
        utils.addParam(someKey, someValue)
        utils.addWhereParam(someKey, someValue)

        then:
        utils.getWhereClause() == "$someKey = ? WHERE $someKey = ?".toString()
        utils.getArguments()[0] == someValue
    }

    def "test add invalid parameter"(){
        setup:
        String someKey = "thisIsSomeKey"
        String someValue = null

        when:
        utils.addParam(someKey, someValue)
        utils.addWhereParam(someKey, someValue)


        then:
        utils.getWhereClause() == "".toString()
    }

    def "test add two parameter"(){
        setup:
        String someKey = "thisIsSomeKey"
        String someValue = "thisIsSomeValue"
        String anotherKey = "thisIsAnotherKey"
        String anotherValue = "thisIsAnotherValue"

        when:
        utils.addParam(someKey, someValue)
        utils.addParam(anotherKey, anotherValue)
        utils.addWhereParam(anotherKey, anotherValue)

        then:
        utils.getWhereClause() == "$someKey = ?, $anotherKey = ? WHERE $anotherKey = ?".toString()
    }

    def "test add null key"(){
        setup:
        String someKey = "thisIsSomeKey"
        String someValue = "thisIsSomeValue"

        when:
        utils.addParam(null, someValue)
        utils.addParam(someKey, null)
        utils.addParam(null, null)

        then:
        utils.getArguments().isEmpty()
    }

    def "test add all"(){
        setup:
        String someKey = "thisIsSomeKey"
        String someValue = "thisIsSomeValue"
        String anotherKey = "thisIsAnotherKey"
        String anotherValue = "thisIsAnotherValue"
        Map<String, Object> someMap = [thisIsSomeKey:someValue]
        Map<String, Object> anotherMap = [thisIsAnotherKey:anotherValue]

        when:
        utils.addParams(someMap)
        utils.addWhereParams(anotherMap)

        then:
        utils.getWhereClause() == "$someKey = ? WHERE $anotherKey = ?".toString()
        utils.getArguments()[0] == someValue
        utils.getArguments()[1] == anotherValue
    }

    def "test add only values"(){
        setup:
        String someValue = "thisIsSomeValue"

        when:
        utils.addParam(someValue)

        then:
        utils.getArguments()[0] == someValue
    }

    def "test add where params with condition"(){
        setup:
        String anotherKey = "thisIsAnotherKey"
        String anotherValue = "thisIsAnotherValue"
        String someCondition = "someCondition"

        when:
        utils.addWhereParam(anotherKey, anotherValue, someCondition)

        then:
        utils.getWhereClause() == " WHERE $anotherKey$someCondition".toString()
    }

    def "test add where params with null value"(){
        setup:
        String anotherKey = "thisIsAnotherKey"
        String anotherValue = null
        String someCondition = "someCondition"

        when:
        utils.addWhereParam(anotherKey, anotherValue, someCondition)

        then:
        utils.getWhereClause() == "".toString()
    }
}
