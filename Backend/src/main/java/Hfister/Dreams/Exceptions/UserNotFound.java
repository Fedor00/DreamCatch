package Hfister.Dreams.Exceptions;

public class UserNotFound extends Exception{
    private final String message;

    public  UserNotFound(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }
}

