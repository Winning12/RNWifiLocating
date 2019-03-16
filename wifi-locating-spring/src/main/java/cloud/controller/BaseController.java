package cloud.controller;

import org.springframework.web.bind.annotation.RequestMapping;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;


@RequestMapping(("/api"))
public class BaseController {
    public Date stringToDate(String paramDate) throws ParseException {
        String realDate = paramDate.substring(1, 20) + ".000+0000";
        DateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
        Date date = sdf.parse(realDate);
        return date;
    }

    //    convert a Date object to string
    public String dateToString(Date date) {
        return date.toString();
    }

    //    convert a Date object to string, example => accepts format of "yyyy-MM-dd HH:mm:ss"
    public String dateToString(LocalDateTime date, String format) throws NullPointerException {
        return date.format(DateTimeFormatter.ofPattern(format));
    }

    public boolean isEmpty(String word) {
        return word == null || word.equals("");
    }


}
