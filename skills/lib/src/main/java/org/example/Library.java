/*
 * Image recognition library
 */
package org.example;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Library {
    
    /**
     * 智能识别图片类型和大小
     * @param imagePath 图片路径
     * @return 包含图片类型和大小信息的Map
     */
    public Map<String, Object> recognizeImage(String imagePath) {
        Map<String, Object> result = new HashMap<>();
        File imageFile = new File(imagePath);
        
        try {
            // 识别图片类型
            String imageType = ImageIO.getReaderFormatNames()[0]; // 默认类型
            for (String format : ImageIO.getReaderFormatNames()) {
                if (imagePath.toLowerCase().endsWith("." + format.toLowerCase())) {
                    imageType = format;
                    break;
                }
            }
            result.put("type", imageType);
            
            // 获取图片大小
            BufferedImage image = ImageIO.read(imageFile);
            if (image != null) {
                int width = image.getWidth();
                int height = image.getHeight();
                result.put("width", width);
                result.put("height", height);
                result.put("size", width + "x" + height);
                result.put("fileSize", imageFile.length() + " bytes");
            }
            
            result.put("success", true);
        } catch (IOException e) {
            result.put("success", false);
            result.put("error", e.getMessage());
        }
        
        return result;
    }
    
    /**
     * 检查文件是否为图片
     * @param imagePath 图片路径
     * @return 是否为图片
     */
    public boolean isImage(String imagePath) {
        File imageFile = new File(imagePath);
        try {
            BufferedImage image = ImageIO.read(imageFile);
            return image != null;
        } catch (IOException e) {
            return false;
        }
    }
}
