package Hfister.Dreams.Exceptions;


public class EntryAlreadyAddedToday extends Exception{
    private final String message;

    public  EntryAlreadyAddedToday(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
