#!/bin/bash

# 每隔10秒调用一次API的脚本
# 支持后台运行和日志输出

# 设置日志文件路径
LOG_FILE="${PWD}/api_call.log"
PID_FILE="${PWD}/api_call.pid"

# 检查命令行参数
if [ "$1" = "stop" ]; then
    if [ -f "$PID_FILE" ]; then
        PID=$(cat "$PID_FILE")
        echo "正在停止进程 $PID..."
        kill "$PID" 2>/dev/null
        rm -f "$PID_FILE"
        echo "脚本已停止"
    else
        echo "没有找到运行中的脚本"
    fi
    exit 0
fi

if [ "$1" = "status" ]; then
    if [ -f "$PID_FILE" ]; then
        PID=$(cat "$PID_FILE")
        if kill -0 "$PID" 2>/dev/null; then
            echo "脚本正在运行，PID: $PID"
            echo "日志文件: $LOG_FILE"
        else
            echo "PID文件存在但进程未运行，清理PID文件"
            rm -f "$PID_FILE"
        fi
    else
        echo "脚本未运行"
    fi
    exit 0
fi

# 函数：记录日志
log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S'): $1" >> "$LOG_FILE"
}

# 函数：清理函数
cleanup() {
    log_message "脚本正在停止..."
    rm -f "$PID_FILE"
    exit 0
}

# 捕获信号
trap cleanup SIGTERM SIGINT

# 检查是否已有实例在运行
if [ -f "$PID_FILE" ]; then
    OLD_PID=$(cat "$PID_FILE")
    if kill -0 "$OLD_PID" 2>/dev/null; then
        echo "脚本已在运行，PID: $OLD_PID"
        echo "使用 '$0 stop' 停止现有实例"
        exit 1
    else
        rm -f "$PID_FILE"
    fi
fi

# 记录PID
echo $$ > "$PID_FILE"

log_message "开始每隔30秒调用API..."
log_message "PID: $$, 日志文件: $LOG_FILE"
log_message "使用 '$0 stop' 停止脚本"

while true; do
    log_message "正在调用API..."
    
    # 执行API调用并捕获响应
    response=$(curl -s --location 'http://115.190.109.216:80/api/ide/v1/knowledgebase/files/split_files' \
        --header 'X-App-Id: a4c6c500-6846-45b6-94f6-1b231eb53742' \
        --header 'Authorization: Cloud-IDE-JWT eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoid3VzaWNoZW5nLnNjIiwidGVuYW50X2lkIjoibjYxdzUxdjc2ODBsMTYiLCJ0eXBlIjoidXNlciJ9LCJleHAiOjE3NTQyOTY3NDEsImlhdCI6MTc1MzY5MTk0MX0.gi3EOk365oGPtyJlEEpIDachBJxXaSyuTEGS53hiS0xdWjv1sg4Yr3zQxkyBzdXMNLqcgNCV2oBWVgH93-Oyo1QB4OInzQ0C018ob8Rga0x9Fsh906rvRzF_ZQpsSd2_rcxnp_n_U84vNHdeqs-XfSzS1ON_nocsT1deamtY2qJJReTBAbBIh97ws_YP7y8C82yDT-oxezP-7H-58IVgELt11DLpDCzEyvElcctg4rkCugzaL-AB5q6Y_i8HFisxdC-8wqwsFTDX6G5G6BpJ60f7MhNNcsAs6_LtswI7_EkbdJhGvSUHNFNlOAmeE_vQ0HlWVS8LYxmcwHiOeTq4uCiFQ7_kBV5GssS96bmY-Yifwzz8qipPU_J6tN4JV6gFsvg0r63N_NNu42xrAIUwS3EMxLK8kd_gSrw5zfaBBp-BEYkE0aFiurG4IsgGhizDma37EdquZ5UIaVnefnAMR4cnG1IUSSKIQazazY9hD3GLiLcU7O87R58t88X14JkKT3VNeHTDa5LT0Pj-xVH8ffGmo4itatc8kaJ6HTT-TecJNensr0J_bYBuUoxO_rPYnaHksZ5PXrTfZUorSO6myBQuK8aOWkDSr6a0wYFZynTBsU0EpcuGESEQW6SBBTG_sj-8goNSyyRuuiCkss1dCIeHJFz2fqmCoLPwaraD42I' \
        --header 'Content-Type: application/json' \
        --data '{
            "chunking_method": "v1",
            "embedding_model":"codekg_bge_m3",
            "files": [
                {
                    "content": "package main \n import \"fmt\"  \nfunc main() {\n\tfmt.Println(\"hello world\")\n}",
                    "path": "DeclarationVisitor.go"
                }
            ]
        }' 2>&1)
    
    # 记录API响应
    if [ $? -eq 0 ]; then
        log_message "API调用成功"
        log_message "响应内容: $response"
    else
        log_message "API调用失败: $response"
    fi
    
    log_message "等待30秒后进行下次调用..."
    log_message "----------------------------------------"
    
    # 等待30秒
    sleep 30
done