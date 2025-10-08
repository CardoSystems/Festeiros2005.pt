import time
import re
import subprocess
from collections import defaultdict
import statistics

def analyze_server_logs(log_file):
    # Parse logs to extract response times, status codes, etc.
    status_codes = defaultdict(int)
    request_paths = defaultdict(int)
    response_times = []
    
    with open(log_file, 'r') as f:
        for line in f:
            # Example regex for parsing logs - adjust based on your actual log format
            match = re.search(r'GET /(\S*) (\d+) (\d+\.\d+)ms', line)
            if match:
                path, status_code, resp_time = match.groups()
                status_codes[status_code] += 1
                request_paths[path] += 1
                response_times.append(float(resp_time))
    
    # Calculate statistics
    if response_times:
        avg_resp_time = sum(response_times) / len(response_times)
        median_resp_time = statistics.median(response_times)
        max_resp_time = max(response_times)
        min_resp_time = min(response_times)
    else:
        avg_resp_time = median_resp_time = max_resp_time = min_resp_time = 0
    
    # Print results
    print("\n===== Server Log Analysis =====")
    print(f"Total Requests: {sum(status_codes.values())}")
    print(f"Status Codes: {dict(status_codes)}")
    print(f"Top 5 Requested Paths: {sorted(request_paths.items(), key=lambda x: x[1], reverse=True)[:5]}")
    print(f"Response Times (ms):")
    print(f"  Average: {avg_resp_time:.2f}")
    print(f"  Median: {median_resp_time:.2f}")
    print(f"  Max: {max_resp_time:.2f}")
    print(f"  Min: {min_resp_time:.2f}")
    print("==============================\n")

# Example usage:
# analyze_server_logs('server_logs.txt')