package ru.itmo.angry.beavers.model;

public class Graph {
    private boolean isInArea(double x, double y, double r) {
        boolean triangle = x <= 0 && y >= 0 && y <= r/2 + x;
        boolean rectangle = x >= 0 && y >= 0 && x <= r  && y <= r/2;
        boolean circle = x <= 0 && y <= 0 && Math.sqrt(x*x + y*y) <= r/2;
        return triangle || rectangle || circle;
    }

    public boolean isInArea(Point point) {
        return isInArea(point.getX(), point.getY(), point.getR());
    }
}
