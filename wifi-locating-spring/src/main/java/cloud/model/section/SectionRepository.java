package cloud.model.section;

import org.springframework.data.repository.CrudRepository;

public interface SectionRepository extends CrudRepository<Section, Long> {

    public Iterable<Section> findAllByRoomName(String roomName);

    public Iterable<Section> findAllByCourseName(String courseName);

    public Iterable<Section> deleteAllByCourseName(String courseName);

    public Iterable<Section> deleteAllByRoomName(String courseName);

    public Section findByDayAndPeriodAndRoomName(int day, int period, String roomName);
}
