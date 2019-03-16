package cloud.model.classroom;

import javax.lang.model.type.ArrayType;
import javax.print.DocFlavor;
import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

/**
 * @author Yang ShengYuan
 * @date 2019/3/15
 * @Description ${DESCRIBE}
 **/
public class Map {
    private int numberOfV;
    public Vertex[] vertexArray;
    public double[][] matrix;
    public HashMap<String,Integer> HashingRoom;

    public Map(String filePath1,String filePath2,int numberOfV){
        this.numberOfV = numberOfV;
        this.vertexArray = new Vertex[numberOfV];
        this.matrix = new double[numberOfV][numberOfV];
        this.HashingRoom = new HashMap<String, Integer>();
        for(int i = 0; i<numberOfV ;i++){
            for(int j = 0; j <numberOfV;j++){
                if(i==j){
                    this.matrix[i][j] = 0;
                }else {
                    this.matrix[i][j] = Double.MAX_VALUE;
                }
            }
        }

        try {
            String[] temp;
            BufferedReader br = new BufferedReader(new FileReader(filePath1));
            String line = "";
            while((line=br.readLine())!=null) {
                temp = line.split(",");
                this.HashingRoom.put(temp[0],Integer.parseInt(temp[3]));
                if(this.vertexArray[Integer.parseInt(temp[3])]==null){
                    this.vertexArray[Integer.parseInt(temp[3])]=new Vertex(Double.parseDouble(temp[1]),Double.parseDouble(temp[2]));
                }
            }
            br.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        try {
            BufferedReader br2 = new BufferedReader(new FileReader(filePath2));
            String[] temp;
            String line = "";
            while((line=br2.readLine())!=null) {
                temp = line.split(",");
                addEdge(Integer.parseInt(temp[0]),Integer.parseInt(temp[1]));
            }
            br2.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void addEdge(int V1,int V2){
        double weight = vertexArray[V1].weight(vertexArray[V2]);
        this.matrix[V1][V2] = weight;
        this.matrix[V2][V1] = weight;
    }

    public void print(){
        for(int i = 0; i< this.numberOfV;i++){
            for(int j = 0; j < this.numberOfV;j++){
                if((int)this.matrix[i][j]==2147483647){
                    System.out.print("0 ");
                }else{
                    System.out.print((int)this.matrix[i][j]+" ");
                }

            }
            System.out.println();
        }
    }

    public int[] dijkstra(int beg, int des){
        int BEG = this.HashingRoom.get(beg+"");
        int DES = this.HashingRoom.get(des+"");

        boolean[] isIn = new boolean[this.numberOfV];
        double[] distances = new double[this.numberOfV];
        int[] preV = new int[this.numberOfV];

        for (int i = 0 ;i<this.numberOfV;i++){//初始化dijkstra参数
            isIn[i] = false;
            distances[i] =this.matrix[BEG][i];
            if(this.matrix[BEG][i]<Double.MAX_VALUE){
                preV[i] = BEG;
            }else{
                preV[i] = -1;
            }
        }
        preV[BEG] = -1;
        isIn[BEG] = true;

        int u = BEG;
        for(int i = 1; i<this.numberOfV;i++){

            int nextV = u;
            double tempDistance = Double.MAX_VALUE;
            for(int j= 0 ;j<this.numberOfV;j++){
                if((!isIn[j]) && (distances[j]<tempDistance)){
                    nextV = j;
                    tempDistance = distances[j];
                }
            }
            isIn[nextV]  = true;
            u = nextV;

            for(int j = 0;j<this.numberOfV;j++){
                if(!isIn[j] && this.matrix[u][j]< Double.MAX_VALUE){
                    double t = distances[u]+this.matrix[u][j];
                    if(t<distances[j]){
                        distances[j] = t;
                        preV[j] = u;
                    }
                }
            }
        }

        int[] VV = new int[this.numberOfV];
        for(int i = 0;i<this.numberOfV;i++){
            VV[i] = -1;
        }
        int p = DES;
        int count = 0;
        while(true){
            VV[count] = p;
            count++;
            if(p==BEG){
                break;
            }
            p = preV[p];
        }
        ArrayList<Integer> mylist = new ArrayList<>();
        for(int i = this.numberOfV-1 ;i>=0 ;i--){
            if(VV[i]!=-1){
                mylist.add(VV[i]);
            }
        }
        int[] newA = new int[mylist.size()];
        for(int i = 0;i<mylist.size();i++){
            for(Object getkey: HashingRoom.keySet()){
                if(HashingRoom.get(getkey).equals(mylist.get(i))){
                    newA[i] = Integer.parseInt((String)getkey);
                }
            }
        }
        return newA;
    }
}
