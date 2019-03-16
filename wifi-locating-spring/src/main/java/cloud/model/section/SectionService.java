package cloud.model.section;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class SectionService {

    @Autowired
    private SectionRepository sectionRepository;

    public Iterable<Section> findAll() {
        return sectionRepository.findAll();
    }

    public void save(Section section) {
        sectionRepository.save(section);
    }

    public void deleteAllByRoomName(String roomName) {
        sectionRepository.deleteAllByRoomName(roomName);
    }

    public void deleteAllByCourseName(String courseName) {
        sectionRepository.deleteAllByCourseName(courseName);
    }

    public Iterable<Section> findAllByRoomName(String roomName) {
        return sectionRepository.findAllByRoomName(roomName);
    }

    public Section findByDayAndPeriodAndName(int day, int period, String roomName){
        return sectionRepository.findByDayAndPeriodAndRoomName(day,period,roomName);
    }

}
