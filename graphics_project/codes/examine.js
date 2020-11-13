function examine () {
    
        pushMatrix();
        mat4.scale(Tmodel, Tmodel, [5, 5, 5]);
        if (view.selectedIndex === 0)
            drawPerson();
        else if (view.selectedIndex === 1) {
            //rotateFromPiv([0,0,0],rad(counter*10),[0,1,0]);
            //mat4.translate(Tmodel,Tmodel,[5,0,0]);
            //rotate(rad(-90),[0,1,0])
            texture = steelTex;
            drawTrain();
        } else if (view.selectedIndex === 2) {
            for (var i = -1; i <= 1; i++) {
                for (var j = -1; j <= 1; j++) {
                    pushMatrix();
                    texture = grassTex;
                    inColor = [0.0, 0.6, 0.0];
                    mat4.translate(Tmodel, Tmodel, [i * 100, 0, j * 100]);
                    drawGround();
                    defaultTex();
                    popMatrix();
                }
            }
        } else if (view.selectedIndex === 3) {
            scale([0.3,0.3,0.3]);
            drawHouse6();
        } else if (view.selectedIndex === 4) {
            texture = apartmentTex;
            drawHouse();
        } else if (view.selectedIndex === 5) {
            texture = wallTex;
            scale([1,3.3,1]);
            drawHouse3();
        } else if (view.selectedIndex === 6) {
            drawHouse5();
        } else if (view.selectedIndex === 7) {
            drawRoad();
        } else if (view.selectedIndex === 8) {
            mat4.scale(Tmodel, Tmodel, [0.2, 0.2, 0.2])
            drawSign();
        }else if (view.selectedIndex === 9) {
            mat4.scale(Tmodel, Tmodel, [0.5, 0.5, 0.5])
            drawTree();
        }else if (view.selectedIndex === 10) {
            texture = steelTex;
            drawTree2();
        }else if (view.selectedIndex === 11) {
            texture = steelTex;
            drawHelicopter();
        }else if (view.selectedIndex === 12) {
            texture = steelTex;
            mat4.scale(Tmodel, Tmodel, [0.2, 0.2, 0.2])
            drawPlane();
        }

        popMatrix();
}