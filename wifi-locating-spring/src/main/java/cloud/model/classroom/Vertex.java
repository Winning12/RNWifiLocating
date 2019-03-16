/**
 * @author Yang ShengYuan
 * @date 2019/3/15
 * @Description ${DESCRIBE}
 **/

package cloud.model.classroom;

public class Vertex {
    public double x;
    public double y;

    public Vertex(double y, double x){
        this.x = x;
        this.y = y;
    }

    public double weight(Vertex anotherV) {
        double distance = Math.pow(this.x-anotherV.x,2)+Math.pow(this.y-anotherV.y,2);
        return Math.sqrt(distance);
    }



}

