package Hfister.Dreams.Exceptions;

public class NotBetweenOneToFive extends Exception{
    private final String message;

    public  NotBetweenOneToFive(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
