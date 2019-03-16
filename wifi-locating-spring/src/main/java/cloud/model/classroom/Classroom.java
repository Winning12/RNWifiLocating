package cloud.model.classroom;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "classroom")
@Data
public class Classroom {

    @Id
    @GeneratedValue
    private Long id;

    public String roomName;

    public String macAddress;

    public String deskType;

    public int capacity;

}
