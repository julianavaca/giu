package com.turner.utils;

import com.turner.utils.sorting.Order;
import com.turner.utils.sorting.SortingElement;
import org.apache.commons.lang3.StringUtils;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Created by mbritez on 4/01/16.
 */
public class QueryUtils {

    public static final String WHERE = " WHERE ";
    public static final String JOINING = ", ";
    public static final String AND = " AND ";
    public static final String DEFAUL_CONDITION = " = ?";
    public static final String LIKE_CONDITION = " like ?";
    public static final String IS_NULL = " IS NULL ";
    public static final String OR = " OR ";
    public static final String ORDER_BY = " ORDER BY ";
    private List<String> arguments = new ArrayList<>();
    private List<Object> argumentsValues = new ArrayList<>();
    private List<ConditionArgument> whereArguments = new ArrayList<>();
    private List<Object> whereArgumentsValues = new ArrayList<>();
    private List<SortingElement> orders = new ArrayList<>();
    private List<QueryUtils> subQuerysArguments = new ArrayList<>();

    public void addParam(String key, Object value){
        if(isValid(key,value)) {
            this.arguments.add(key);
            this.argumentsValues.add(value);
        }
    }

    public void addParam(Object value){
        if(isValid(value)){
            this.argumentsValues.add(value);
        }
    }

    public void addParams(Map<String, Object> params){
        this.arguments.addAll(params.keySet());
        this.argumentsValues.addAll(params.values());
    }

    public void addWhereParam(String key, Object value){
        if(isValid(key,value)){
            this.whereArguments.add(new ConditionArgument(key, DEFAUL_CONDITION));
            this.whereArgumentsValues.add(value);
        }
    }

    public void addWhereLikeParam(String key, Object value){
        if(isValid(key,value)){
            this.whereArguments.add(new ConditionArgument(key, LIKE_CONDITION));
            this.whereArgumentsValues.add(value);
        }
    }


    public void addWhereParam(String key, Object value, String condition){
        if(isValid(key,value)){
            this.whereArguments.add(new ConditionArgument(key, condition));
            this.whereArgumentsValues.add(value);
        }
    }

    public void addWhereParam(String key, List<Object> values, String condition){
        if (!Optional.ofNullable(condition).isPresent()){
            condition = builCondition(values.size());
        }
        if(isValid(key,values)){
            this.whereArguments.add(new ConditionArgument(key, condition));
            this.whereArgumentsValues.addAll(values);
        }
    }

    private String builCondition(int countParams) {
        return new StringBuilder()
                .append(" IN (")
                .append(StringUtils.repeat("?", JOINING, countParams))
                .append(") ").toString();
    }

    public void addWhereParams(Map<String, Object> params){
        params.keySet().stream().forEach(key -> this.whereArguments.add(new ConditionArgument(key, DEFAUL_CONDITION)));
        this.whereArgumentsValues.addAll(params.values());
    }

    public void addWhereOrParam(String key, Object value, String condition){
        if(isValid(key,value)){
            this.whereArguments.add(new ConditionArgument(key, condition, true));
            this.whereArgumentsValues.add(value);
        }

    }

    public void addWhereNotExistingParam(String key) {
        if (isValid(key)){
            this.whereArguments.add(new ConditionArgument(key));
        }
    }

    private Boolean isValid(String key, Object value){
        return isValid(key) && isValid(value);
    }

    private Boolean isValid(Object value){
        return Optional.ofNullable(value).isPresent();
    }


    public List<Object> getArguments(){
        List<Object> result = new ArrayList<>(argumentsValues);
        result.addAll(whereArgumentsValues);
        subQuerysArguments.stream().forEach(queryUtils -> result.addAll(queryUtils.whereArgumentsValues));
        return result;
    }

    public void addSortingElement(Order order ){
        this.orders.add(order);
    }

    public String getKeyArguments(){
        return new StringBuilder()
                .append(arguments
                        .stream()
                        .collect(Collectors.joining(JOINING)))
                        .toString();
    }

    public String getWhereClause(){
        if (whereArguments.isEmpty()){
            return getOrderByClause();
        } else{
            StringBuilder result = new StringBuilder()
                    .append(collect(arguments))
                    .append(WHERE)
                    .append(collectCondition(whereArguments));
            this.subQuerysArguments.stream().forEach(queryUtils -> {
                        result.append(AND + " ( ");
                        result.append(collectCondition(queryUtils.whereArguments));
                        result.append(" ) ");
                    });
            result.append(getOrderByClause());
            return result.toString();
        }
    }

    private String collectCondition(List<ConditionArgument> params){
        StringBuilder result = new StringBuilder();
        result.append(params
                .stream()
                .filter(conditionArgument -> !conditionArgument.isOrCondition())
                .map(conditionArgument -> getArgumentWithCondition(conditionArgument))
                .collect(Collectors.joining(AND)));
        params
                .stream()
                .filter(conditionArgument -> conditionArgument.isOrCondition())
                .forEach(conditionArgument -> {
                    result.append(OR);
                    result.append(getArgumentWithCondition(conditionArgument));
                });
        return result.toString();
    }

    private String getArgumentWithCondition(ConditionArgument it) {
        return Optional.ofNullable(it.getCondition()).isPresent() ? it.getArgument() + it.getCondition() : it.getArgument() + IS_NULL;
    }

    public String getOrderByClause(){
        return orders.isEmpty() ?
                ""
                : ORDER_BY +
                    orders.stream()
                        .map(it -> it.toSqlString())
                        .collect(Collectors.joining(JOINING));
    }

    private String collect(List<String> params){
        return params
                .stream()
                .map(it -> it + DEFAUL_CONDITION)
                .collect(Collectors.joining(JOINING));
    }

    public void addSubQuerysArguments(QueryUtils queryUtils) {
        subQuerysArguments.add(queryUtils);
    }
}
