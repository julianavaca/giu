package com.turner.utils;

/**
 * Created by biandra on 16/02/16.
 */
public class ConditionArgument {

    private String argument;
    private String condition;
    private boolean orCondition;

    public ConditionArgument(String argument, String condition){
        this.argument = argument;
        this.condition = condition;
    }

    public ConditionArgument(String argument){
        this.argument = argument;
    }

    public ConditionArgument(String argument, String condition, boolean orCondition) {
        this.argument = argument;
        this.condition = condition;
        this.orCondition = orCondition;
    }

    public String getArgument() {
        return argument;
    }

    public void setArgument(String argument) {
        this.argument = argument;
    }

    public String getCondition() {
        return condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }

    public boolean isOrCondition() {
        return orCondition;
    }

    public void setOrCondition(boolean orCondition) {
        this.orCondition = orCondition;
    }
}
