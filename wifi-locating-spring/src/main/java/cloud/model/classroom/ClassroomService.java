package cloud.model.classroom;


import cloud.model.section.Section;
import cloud.model.section.SectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Transactional
@Service
public class ClassroomService {

    @Autowired
    private ClassroomRepository classroomRepository;

    @Resource
    private SectionService sectionService;

    public boolean existByRoomName(String roomName) {
        return classroomRepository.findByRoomName(roomName) != null;
    }

    public boolean existByMacAddress(String macAddress) {
        return classroomRepository.findByMacAddress(macAddress) != null;
    }

    public void save(Classroom classroom) {
        classroomRepository.save(classroom);
    }

    public Classroom findByRoomName(String roomName) {
        return classroomRepository.findByRoomName(roomName);
    }

    public Classroom findByMacAddress(String macAddress) {
        return classroomRepository.findByMacAddress(macAddress);
    }

    public Iterable<Classroom> findAll() {
        return classroomRepository.findAll();
    }

    public void deleteByRoomName(String roomName) {
        classroomRepository.deleteByRoomName(roomName);
    }

    public String[][] getWeeklyScheduleByName(String roomName) {
        Iterable<Section> sections = sectionService.findAllByRoomName(roomName);
        String[][] results = new String[8][12];
        for (Section section : sections) {
            results[section.getDay()][section.getPeriod()] = section.getCourseName();
        }
        return results;
    }

    public String[][] getWeeklySchedule(String macAddress) {
        String roomName= classroomRepository.findByMacAddress(macAddress).roomName;
        Iterable<Section> sections = sectionService.findAllByRoomName(roomName);
        String[][] results = new String[8][12];
        for (Section section : sections) {
            results[section.getDay()][section.getPeriod()] = section.getCourseName();
        }
        return results;
    }

}
