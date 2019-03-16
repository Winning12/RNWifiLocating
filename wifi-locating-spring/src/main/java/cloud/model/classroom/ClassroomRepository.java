package cloud.model.classroom;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface ClassroomRepository extends CrudRepository<Classroom, Long> {

    public Classroom findByRoomName(String roomName);

    public Classroom findByMacAddress(String macAddress);

    public void deleteByRoomName(String roomName);

    @Modifying
    @Query("update Classroom c set c = ?1 where c.roomName = ?2")
    @Transactional
    public void updateByRoomName(Classroom classroom,String roomName);
}
