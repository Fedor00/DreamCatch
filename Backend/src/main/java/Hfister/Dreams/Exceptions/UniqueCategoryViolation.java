package Hfister.Dreams.Exceptions;


public class UniqueCategoryViolation extends Exception{
    private final String message;

    public  UniqueCategoryViolation(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }
}

