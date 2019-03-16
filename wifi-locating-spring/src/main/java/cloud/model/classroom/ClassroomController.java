package cloud.model.classroom;

import cloud.controller.BaseController;
import cloud.controller.Result;
import cloud.model.section.SectionService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
public class ClassroomController extends BaseController {

    @Resource
    private ClassroomService classroomService;

    @Resource
    private ClassroomRepository classroomRepository;

    @Resource
    private SectionService sectionService;

    @GetMapping(value = { "/classroom/all" })
    public Result findAll() {
        return new Result("SUCCESS", "find all classrooms", classroomService.findAll());
    }

    @PostMapping(value = { "/classroom/create" })
    public Result create(@ModelAttribute Classroom classroom) {

        if (isEmpty(classroom.roomName)) {
            return new Result("FAIL", "Room name cannot be empty");
        }

        if (isEmpty(classroom.macAddress)) {
            return new Result("FAIL", "MAC address cannot be empty");
        }

        if (isEmpty(classroom.deskType)) {
            return new Result("FAIL", "Desk type cannot be empty");
        }

        if (classroom.capacity < 0) {
            return new Result("FAIL", "Room capacity cannot less than 0");
        }

        if (classroomService.existByRoomName(classroom.roomName)) {
            return new Result("FAIL", "Room name already exists");
        }

        classroomService.save(classroom);
        return new Result("SUCCESS", "Create classroom", classroom);
    }

    @PostMapping(value = { "/classroom/updateByRoomName" })
    public Result updateByRoomName(@ModelAttribute Classroom newClassroom) {

        if (!classroomService.existByRoomName(newClassroom.roomName)) {
            return new Result("FAIL", "The classroom does not exist");
        }

        Classroom oldClassroom = classroomService.findByRoomName(newClassroom.roomName);

        if (!isEmpty(newClassroom.macAddress)) {
            oldClassroom.macAddress=newClassroom.macAddress;
        }

        if (!isEmpty(newClassroom.deskType)) {
            oldClassroom.deskType=newClassroom.deskType;
        }

        if (newClassroom.capacity >= 0) {
            oldClassroom.capacity=newClassroom.capacity;
        }

        classroomRepository.updateByRoomName(oldClassroom,newClassroom.roomName );

        return new Result("SUCCESS", "Update classroom", oldClassroom);
    }

    @GetMapping(value = { "/classroom/delete/{roomName}" })
    public Result deleteByRoomName(@PathVariable("roomName") String roomName) {

        if (isEmpty(roomName)) {
            return new Result("FAIL", "roomName cannot be empty");
        }

        if (!classroomService.existByRoomName(roomName)) {
            return new Result("FAIL", "The classroom does not exist");
        }

        classroomService.deleteByRoomName(roomName);
        return new Result("SUCCESS", "Delete classroom");
    }

    @GetMapping(value = { "/classroom/get/{macAddress}" })
    public Result get(@PathVariable("macAddress") String macAddress) {

        if (isEmpty(macAddress)) {
            return new Result("FAIL", "macAddress cannot be empty");
        }

        if (!classroomService.existByMacAddress(macAddress)) {
            return new Result("FAIL", "The classroom does not exist");
        }

        Classroom classroom = classroomService.findByMacAddress(macAddress);
        System.out.println(classroom);
        return new Result("SUCCESS", "Get classroom detail", classroom);
    }

    @GetMapping(value = { "/classroom/getByName/{roomName}" })
    public Result getByName(@PathVariable("roomName") String roomName) {

        if (isEmpty(roomName)) {
            return new Result("FAIL", "roomName cannot be empty");
        }

        if (!classroomService.existByRoomName(roomName)) {
            return new Result("FAIL", "The classroom does not exist");
        }

        Classroom classroom = classroomService.findByRoomName(roomName);
        return new Result("SUCCESS", "Get classroom detail", classroom);
    }

    @GetMapping(value = { "/classroom/getWeeklySchedule/{macAddress}" })
    public Result getWeeklySchedule(@PathVariable("macAddress") String macAddress) {

        if (isEmpty(macAddress)) {
            return new Result("FAIL", "macAddress cannot be empty");
        }

        if (!classroomService.existByMacAddress(macAddress)) {
            return new Result("FAIL", "Classroom not exist");
        }

        String[][] weeklySchedule = classroomService.getWeeklySchedule(macAddress);
        return new Result("SUCCESS", "Get classroom detail", weeklySchedule);
    }

    @GetMapping(value = { "/classroom/getWeeklyScheduleByName/{roomName}" })
    public Result getWeeklyScheduleByName(@PathVariable("roomName") String roomName) {

        if (isEmpty(roomName)) {
            return new Result("FAIL", "roomName cannot be empty");
        }

        if (!classroomService.existByRoomName(roomName)) {
            return new Result("FAIL", "Classroom not exist");
        }

        String[][] weeklySchedule = classroomService.getWeeklyScheduleByName(roomName);
        return new Result("SUCCESS", "Get classroom detail", weeklySchedule);
    }

    @PostMapping(value = { "/classroom/navigation" })
    public Result getNavigation(@RequestParam("startPoint") String startPoint,@RequestParam("endPoint") String endPoint) {
        Map map=new Map("/RoomInformation.csv","/EdgeInformation.csv",16);
        int[] res=map.dijkstra(Integer.parseInt(startPoint),Integer.parseInt(endPoint));
        return new Result("SUCCESS", "Get classroom Navigation", res);
    }
}
