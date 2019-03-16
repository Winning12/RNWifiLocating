package cloud.model.section;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "section")
@Data
public class Section {

    @Id
    @GeneratedValue
    private Long id;

    private String courseName;

    private String roomName;

    // 1: Monday
    private int day;

    private int period;

}
